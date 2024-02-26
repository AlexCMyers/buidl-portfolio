import * as React from 'react'
import { useSendTransaction } from 'wagmi' 
import { parseEther } from 'viem' 
 
export function SendTransaction() {
  //where is useSendTransactionFrom?
  const { data: hash, sendTransaction, isPending} = useSendTransaction() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    //common things forms do when click submit: reload page. Dont do that.
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement)
    const value = formData.get('value') as string 
    //parse____ makes the different number of decimals human readable
    //sendTransaction is from wagmi
    //always use
    sendTransaction({ to: '0x187dC21BB9580717CbCf4277380C2813da4f6b55', value: parseEther(value) }) 
  } 

  return (
    <form onSubmit={submit} className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Buy me a coffee!</h1>
      { /* TODO: put ETH outside of the box so people don't type it */}
      <input name="value" placeholder="0.05 ETH" required className="p-2 border border-gray-300 rounded" />
      <button type="submit" disabled={isPending} className="p-2 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple w-100">
        {isPending ? 'Confirming...' : 'Donate'}
      </button>
      {hash && <div className="text-gray-500">Transaction Hash: {hash}</div>}
    </form>
  )
}