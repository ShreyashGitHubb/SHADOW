use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod shadow {
    use super::*;

    pub fn initialize_influencer(ctx: Context<InitializeInfluencer>, referral_id: String) -> Result<()> {
        let influencer = &mut ctx.accounts.influencer;
        influencer.authority = ctx.accounts.authority.key();
        influencer.referral_id = referral_id;
        influencer.total_earned = 0;
        influencer.bump = ctx.bumps.influencer;
        Ok(())
    }

    pub fn register_referral(ctx: Context<RegisterReferral>) -> Result<()> {
        let record = &mut ctx.accounts.referral_record;
        record.influencer = ctx.accounts.influencer.key();
        record.user = ctx.accounts.user.key();
        record.timestamp = Clock::get()?.unix_timestamp;
        record.bump = ctx.bumps.referral_record;
        
        msg!("Referral registered: User {} linked to Influencer {}", record.user, record.influencer);
        Ok(())
    }

    // Note: Rewards are handled via Jupiter Referral Program's fee distribution.
    // This claim function would be for any additional platform-specific rewards.
    pub fn claim_rewards(_ctx: Context<ClaimRewards>) -> Result<()> {
        // Implementation for custom reward distribution
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(referral_id: String)]
pub struct InitializeInfluencer<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + (4 + 32) + 8 + 1, // disc + pubkey + string(32) + u64 + bump
        seeds = [b"influencer", referral_id.as_bytes()],
        bump
    )]
    pub influencer: Account<'info, Influencer>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RegisterReferral<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 32 + 8 + 1, // disc + influencer + user + i64 + bump
        seeds = [b"referral", user.key().as_ref()],
        bump
    )]
    pub referral_record: Account<'info, ReferralRecord>,
    pub influencer: Account<'info, Influencer>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimRewards<'info> {
    #[account(mut, has_one = authority)]
    pub influencer: Account<'info, Influencer>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Influencer {
    pub authority: Pubkey,
    pub referral_id: String,
    pub total_earned: u64,
    pub bump: u8,
}

#[account]
pub struct ReferralRecord {
    pub influencer: Pubkey,
    pub user: Pubkey,
    pub timestamp: i64,
    pub bump: u8,
}
