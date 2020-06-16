export interface IEventDb {
    _id: string,
    note: string, 
    date: string,
}

export interface IContextProps {
    show: boolean,
    date: string,
    note: string,
    events: Array<IEvent>,
    importDest: string,
    onShow: () => void,
    onClose: () => void,
    onDatePick: (event : any) => void,
    onNoteSet: (event : any) => void,
    onEventSave: (id: string | null) => void,
    onEdit: (event : IEvent) => void,
    onDelete: () => void,
    onExportSelect: (data: any) => void,
    onExport: () => void,
    onImportSel: (data: string) => void,
    onImport: (event: any) => void;
}

export interface IEvent {
    id: string,
    start: string,
    end: string,
    title: string,
}
