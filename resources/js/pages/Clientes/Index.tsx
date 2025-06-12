import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/Clientes',
    },
];

export default function Clientes() {
    const { clientes } = usePage().props;

    const { delete: destroy} = useForm();
    
    const destroyCliente: FormEventHandler = (e, id) => {
        e.preventDefault();
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            destroy(route('clientes.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    // Optionally, you can show a success message or perform other actions after deletion
                },
            });
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                    <Link
                        href={route('clientes.create')}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Adicionar Cliente
                    </Link>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Nome</th>
                                <th scope="col" className="px-6 py-3">E-mail</th>
                                <th scope="col" className="px-6 py-3">Telefone</th>
                                <th scope="col" className="px-6 py-3">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(({id, nome, email, telefone}) => (
                                <tr 
                                    key={id}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                >
                                    <td className="px-6 py-2 font-medium text-gray-900 dark:text-white">{id}</td>
                                    <td className="px-6 py-2 text-gray-600 dark:text-gray-300">{nome}</td>
                                    <td className="px-6 py-2 text-gray-600 dark:text-gray-300">{email}</td>
                                    <td className="px-6 py-2 text-gray-600 dark:text-gray-300">{telefone}</td>
                                    <td className="px-6 py-2">
                                        <form onSubmit={(e) => destroyCliente(e, id)}>
                                        <Link
                                            href={route('clientes.edit', { cliente: id })}
                                             className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >   
                                            Editar
                                           </Link>
                                        <button className="px-3 py-2 text-xs font-medium text-white bg-red-700 rounded-lg hover:bg-red-800">
                                            Apagar
                                        </button>
                                        </form>
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