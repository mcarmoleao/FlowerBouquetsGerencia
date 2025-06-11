import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Edit({ flor }: PageProps<{ flor: any }>) {
    const [nome, setNome] = useState(flor.nome);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        router.put(`/flores/${flor.id}`, { nome });
    }

    return (
        <AuthLayout title="Editar Flor">
            <h1 className="text-xl font-bold mb-4">Editar Flor</h1>
            <form onSubmit={submit}>
                <input
                    type="text"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    className="border p-2"
                />
                <button type="submit" className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
                    Atualizar
                </button>
            </form>
        </AuthLayout>
    );
}
