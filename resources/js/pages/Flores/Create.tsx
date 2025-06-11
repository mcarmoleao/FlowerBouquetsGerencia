import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Create() {
    const [nome, setNome] = useState('');

    function submit(e: React.FormEvent) {
        e.preventDefault();
        router.post('/flores', { nome });
    }

    return (
        <AuthLayout title="Nova Flor">
            <h1 className="text-xl font-bold mb-4">Criar Nova Flor</h1>
            <form onSubmit={submit}>
                <input
                    type="text"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder="Nome da flor"
                    className="border p-2"
                />
                <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Guardar
                </button>
            </form>
        </AuthLayout>
    );
}
