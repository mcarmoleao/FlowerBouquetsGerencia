import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AppLayout from '@/layouts/app-layout'; // Troca de AuthLayout para AppLayout
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Flores',
        href: '/flores',
    },
];

export default function Flores() {
    const { flores, auth } = usePage().props as any;

    const { delete: destroy } = useForm();

    const destroyFlor = (id: number) => (e: React.FormEvent) => {
        e.preventDefault();
        if (confirm('Tem certeza que deseja excluir esta flor?')) {
            destroy(route('flores.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    // Optional: Show success message
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flores" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                    {/* Só mostra o botão de adicionar se for funcionario */}
                    {auth?.user?.role === 'funcionario' && (
                        <Link
                            href={route('flores.create')}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Adicionar Flor
                        </Link>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Nome</th>
                                <th scope="col" className="px-6 py-3">Preço</th>
                                <th scope="col" className="px-6 py-3">Stock</th>
                                <th scope="col" className="px-6 py-3">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flores.map(({ id, nome, preco, stock }: any) => (
                                <tr
                                    key={id}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                >
                                    <td className="px-6 py-2 font-medium text-gray-900 dark:text-white">{id}</td>
                                    <td className="px-6 py-2 text-gray-600 dark:text-gray-300">{nome}</td>
                                    <td className="px-6 py-2 text-gray-600 dark:text-gray-300">{preco} €</td>
                                    <td className="px-6 py-2 text-gray-600 dark:text-gray-300">{stock}</td>
                                    <td className="px-6 py-2">
                                        {/* Só mostra o botão de editar e remover se for funcionario */}
                                        {auth?.user?.role === 'funcionario' && (
                                            <>
                                                <Link
                                                    href={route('flores.edit', { flor: id })}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                    Editar
                                                </Link>
                                                <form onSubmit={destroyFlor(id)} style={{ display: 'inline' }}>
                                                    <button
                                                        type="submit"
                                                        className="ml-2 px-3 py-2 text-xs font-medium text-white bg-red-700 rounded-lg hover:bg-red-800"
                                                    >
                                                        Apagar
                                                    </button>
                                                </form>
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
