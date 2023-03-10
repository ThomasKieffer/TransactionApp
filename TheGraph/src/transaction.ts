import { Transfered as TransferedEvent } from "../generated/Transaction/Transaction"
import { Transfered } from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleTransfered(event: TransferedEvent): void {
  let entity = new Transfered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.amount = event.params.amount
  if(event.receipt){
    entity.status = event.receipt!.status
  }
  else {
    entity.status = new BigInt(0);
  }
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
