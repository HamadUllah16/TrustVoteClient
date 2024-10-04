'use client'
import { useState } from 'react';
import { Document, Page } from 'react-pdf';

export default function PDF({ fileUrl }: { fileUrl: string }) {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <div style={{ height: '80vh', overflow: 'scroll' }}>
            <div style={{ paddingRight: '12px' }}>
                <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} >
                    <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </div>
        </div>
    );
}

