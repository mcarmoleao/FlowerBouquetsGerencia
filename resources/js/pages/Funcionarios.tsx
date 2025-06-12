import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { useState } from 'react';

interface Funcionario {
    id: number;
    name: string;
    email: string;
}

const breadcrumbs = [
    { title: 'Funcionários', href: '/funcionarios' },
];

export default function Funcionarios() {
    const { props } = usePage<{ funcionarios: Funcionario[] }>();
    const funcionarios: Funcionario[] = props.funcionarios ?? [];
    const [editingId, setEditingId] = useState<number | null>(null);
    const { data, setData, put, delete: destroy, errors } = useForm<{ name: string; email: string }>({ name: '', email: '' });

    const startEdit = (func: Funcionario) => {
        setEditingId(func.id);
        setData({ name: func.name, email: func.email });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setData({ name: '', email: '' });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as 'name' | 'email', e.target.value);
    };

    const submitEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        put(route('funcionarios.update', id), {
            onSuccess: cancelEdit,
        });
    };

    const handleDelete = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        if (confirm('Tem certeza que deseja remover este funcionário?')) {
            destroy(route('funcionarios.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Funcionários" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <h1 className="text-2xl font-bold mb-4">Funcionários</h1>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Nome</th>
                                <th className="px-6 py-3">E-mail</th>
                                <th className="px-6 py-3">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funcionarios.map((func: Funcionario) => (
                                <tr key={func.id} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                                    <td className="px-6 py-2">{func.id}</td>
                                    <td className="px-6 py-2">
                                        {editingId === func.id ? (
                                            <Input name="name" value={data.name} onChange={handleEditChange} />
                                        ) : (
                                            func.name
                                        )}
                                    </td>
                                    <td className="px-6 py-2">
                                        {editingId === func.id ? (
                                            <Input name="email" value={data.email} onChange={handleEditChange} />
                                        ) : (
                                            func.email
                                        )}
                                    </td>
                                    <td className="px-6 py-2 flex gap-2">
                                        {editingId === func.id ? (
                                            <>
                                                <Button onClick={(e) => submitEdit(e, func.id)} size="sm">Guardar</Button>
                                                <Button onClick={cancelEdit} size="sm" variant="secondary">Cancelar</Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button onClick={() => startEdit(func)} size="sm">Editar</Button>
                                                <Button onClick={(e) => handleDelete(e, func.id)} size="sm" variant="destructive">Remover</Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
