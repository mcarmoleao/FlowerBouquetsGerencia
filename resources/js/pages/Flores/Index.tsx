import React from 'react';
import { PageProps } from '@/types';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Index({ flores }: PageProps<{ flores: any[] }>) {
    return (
        <AuthLayout title="Flores">
            <h1 className="text-2xl font-bold mb-4">Lista de Flores</h1>
            <ul>
                {flores.map((flor, i) => (
                    <li key={i}>{flor.nome}</li>
                ))}
            </ul>
        </AuthLayout>
    );
}
