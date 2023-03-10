import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Transfered } from "../generated/Transaction/Transaction"

export function createTransferedEvent(
  from: Address,
  to: Address,
  amount: BigInt
): Transfered {
  let transferedEvent = changetype<Transfered>(newMockEvent())

  transferedEvent.parameters = new Array()

  transferedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return transferedEvent
}
