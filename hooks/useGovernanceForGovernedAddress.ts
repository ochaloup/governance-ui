import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'
import useGovernanceAssets from './useGovernanceAssets'

const useGovernanceForGovernedAddress = (pubkey?: PublicKey) => {
  const { assetAccounts } = useGovernanceAssets()
  const assetAccount = useMemo(
    () => pubkey && assetAccounts.find((x) => x.pubkey.equals(pubkey)),
    [assetAccounts, pubkey]
  )
  return assetAccount?.governance
}

const useNativeTreasuryForGovernedAddress = (pubkey?: PublicKey) => {
  const { assetAccounts, governedNativeAccounts } = useGovernanceAssets()
  const assetAccount = useMemo(
    () => pubkey && assetAccounts.find((x) => x.pubkey.equals(pubkey)),
    [assetAccounts, pubkey]
  )
  const governedNativeAccount = useMemo(
    () => pubkey && governedNativeAccounts.find((x) => assetAccount && x.governance.pubkey.equals(assetAccount.governance.pubkey)),
    [governedNativeAccounts, pubkey]
  )
  return governedNativeAccount?.pubkey
}

export { useNativeTreasuryForGovernedAddress }
export default useGovernanceForGovernedAddress
