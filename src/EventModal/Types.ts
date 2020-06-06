export interface EventModalProps {
    onShow: () => void,
    onHide: () => void,
    onDatePick: (event: any) => void,
    onNoteSet: (event: any) => void,
    onSave: () => void,
}