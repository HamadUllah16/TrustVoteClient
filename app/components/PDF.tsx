'use client'
import { Button } from '@mui/material';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';

export default function PDF({ fileUrl }: { fileUrl: string }) {
    const [numPages, setNumPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    function goToPrevPage() {
        setPageNumber((prev) => (prev > 1 ? prev - 1 : prev));
    }

    function goToNextPage() {
        setPageNumber((prev) => (prev < numPages ? prev + 1 : prev));
    }

    return (
        <div style={{ height: '80vh', overflow: 'scroll', textAlign: 'center' }}>
            <div style={{ paddingRight: '12px' }}>
                <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
                <Button onClick={goToPrevPage} disabled={pageNumber <= 1}>
                    Previous
                </Button>
                <Button onClick={goToNextPage} disabled={pageNumber >= numPages}>
                    Next
                </Button>
            </div>
        </div>
    );
}
