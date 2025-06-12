import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reclamações',
        href: '/reclamacoes',
    },
];

export default function Reclamacoes() {
    const { reclamacoes, auth } = usePage().props as any;
    const { delete: destroy } = useForm();

    // Estado local para guardar alterações de estado das reclamações
    const [estadoEdit, setEstadoEdit] = useState<{ [key: string]: string }>({});
    const { put } = useForm();

    const destroyReclamacao = (id: number | string) => (e: React.FormEvent) => {
        e.preventDefault();
        if (confirm('Tem certeza que deseja excluir esta reclamação?')) {
            destroy(route('reclamacoes.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    // Optionally, you can show a success message or perform other actions after deletion
                },
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reclamações" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                    {/* Só mostra o botão de criar se for funcionario */}
                    {auth?.user?.role === 'funcionario' && (
                        <Link
                            href={route('reclamacoes.create')}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Nova Reclamação
                        </Link>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Título</th>
                                <th scope="col" className="px-6 py-3">Descrição</th>
                                <th scope="col" className="px-6 py-3">Cliente</th>
                                <th scope="col" className="px-6 py-3">Estado</th>
                                <th scope="col" className="px-6 py-3">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reclamacoes.map(({ id, titulo, descricao, cliente, estado }: any) => (
                                <tr key={id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-2 font-medium text-gray-900 dark:text-white">{id}</td>
                                    <td className="px-6 py-2 text-gray-600 dark:text-gray-300">{titulo}</td>
                                    <td className="px-6 py-2 text-gray-600 dark:text-gray-300">{descricao}</td>
                                    <td className="px-6 py-2 text-gray-600 dark:text-gray-300">
                                        {cliente ? (
                                            <Link
                                                href={`/clientes/${cliente.id}/edit`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {cliente.nome}
                                            </Link>
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                    <td className="px-6 py-2 text-gray-600 dark:text-gray-300">
                                        {/* Estado dropdown só para admin */}
                                        {auth?.user?.role === 'admin' ? (
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    router.put(route('reclamacoes.update', id), { estado: estadoEdit[id] || estado || 'pendente' });
                                                }}
                                                className="flex gap-2 items-center"
                                            >
                                                <select
                                                    value={estadoEdit[id] ?? estado ?? 'pendente'}
                                                    className="border rounded px-2 py-1"
                                                    onChange={e => setEstadoEdit(prev => ({ ...prev, [id]: e.target.value }))}
                                                >
                                                    <option value="pendente">Pendente</option>
                                                    <option value="resolvida">Resolvida</option>
                                                </select>
                                                <button
                                                    type="submit"
                                                    className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                                >
                                                    Guardar
                                                </button>
                                            </form>
                                        ) : (
                                            estado || 'pendente'
                                        )}
                                    </td>
                                    <td className="px-6 py-2">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('reclamacoes.edit', id)}
                                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                Editar
                                            </Link>
                                            {/* Só funcionario pode remover */}
                                            {auth?.user?.role === 'funcionario' && (
                                                <form onSubmit={destroyReclamacao(id)}>
                                                    <button
                                                        type="submit"
                                                        className="px-3 py-2 text-xs font-medium text-white bg-red-700 rounded-lg hover:bg-red-800"
                                                    >
                                                        Apagar
                                                    </button>
                                                </form>
                                            )}
                                        </div>
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