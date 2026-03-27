'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from './Skeleton';

interface Document {
  doc_id: number;
  doc_name: string;
  doc_type: string;
  doc_url: string;
  thumbnail_url: string;
  issuer: string;
  achievement_type: string;
  issue_date: string;
  description: string;
  updated_on: string;
  isPdfLoading?: boolean;
  thumbnail?: string;
  pageNo?: number;
}

interface DocumentsSectionProps {
  documents: Document[];
  isLoading: boolean;
  onDocumentClick: (doc: Document) => void;
}

export default function DocumentsSection({ documents, isLoading, onDocumentClick }: DocumentsSectionProps) {
  const { t } = useTranslation();
  const [selectedDoc, setSelectedDoc] = useState(-1);

  if (!documents.length && !isLoading) return null;

  return (
    <div className="w-full md:w-[70%] md:ml-[20px] mt-5 md:mt-0">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {!isLoading && documents.length > 0 && (
          <div
            className="px-5 py-3 flex items-center h-[50px] bg-cover bg-center border-b"
            style={{
              backgroundImage: "url('/assets/img/playerPublicProfile/tableHeader.png')",
              backgroundSize: '100% 100%',
            }}
          >
            <h2 className="text-white font-bold text-sm m-0">{t('achivements')}</h2>
            <div className="w-px h-5 bg-white/50 mx-5" />
            <h2 className="text-white font-bold text-sm m-0">{t('certificateAwards')}</h2>
          </div>
        )}

        {isLoading && (
          <div className="p-4">
            <Skeleton height={40} />
          </div>
        )}

        {documents.length > 0 && (
          <div className="p-3 flex flex-wrap gap-3">
            {documents.map((doc, index) => (
              <div
                key={doc.doc_id}
                className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.33%-8px)] flex flex-col items-center"
              >
                {isLoading ? (
                  <Skeleton width={260} height={190} className="rounded-lg" />
                ) : (
                  <div
                    className="relative cursor-pointer group"
                    onMouseEnter={() => setSelectedDoc(index)}
                    onMouseLeave={() => setSelectedDoc(-1)}
                    onClick={() => onDocumentClick(doc)}
                  >
                    <img
                      src={doc.doc_type === '.pdf' ? (doc.thumbnail || '/assets/img/1h_placeholder.png') : doc.doc_url}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/img/1h_placeholder.png';
                      }}
                      alt={doc.doc_name}
                      className="w-[260px] h-[190px] rounded-lg object-cover shadow-lg"
                    />
                    {selectedDoc === index && (
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-transparent to-black/70 flex items-end p-2">
                        <span className="text-white font-bold text-sm">{doc.doc_name}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
