import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import React from 'react'

export interface PopoverProps{
    triggerText: React.ReactNode;
    children: React.ReactNode;
}
const PopoverDialog = ({triggerText, children}: PopoverProps) => {
  return (
    <Popover>
        <PopoverTrigger asChild>{triggerText}</PopoverTrigger>
        <PopoverContent>
    {children}
        </PopoverContent>
    </Popover>
  )
}

export default PopoverDialog