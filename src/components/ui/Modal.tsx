import React from "react"
import Card from "./Card"
import Icon from "./Icon"

interface ModalProps {
    children: React.ReactNode,
    setIsOpen: (val: boolean) => void,
    title?: string
}

export const Modal = ({children, setIsOpen, title}: ModalProps) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }
    
    return (
        <div className={`fixed inset-0 bg-[#0000003c] flex items-center justify-center z-50 p-4 animate-fadeIn `} onClick={() => setIsOpen(false)}>
            <Card className="w-full max-w-lg bg-white relative" onClick={handleClick}>
                {/* Header */}
                <div className="p-4 sm:p-6 flex justify-between items-start border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                    <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors">
                        <Icon name="close" className="w-5 h-5"/>
                    </button>
                </div>

                <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
                    {children}
                </div>
            </Card>
        </div>
    )
}