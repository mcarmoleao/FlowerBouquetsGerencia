import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Editar Cliente',
        href: '/Clientes',
    },
];

export default function ClienteEdit() {
    const { cliente } = usePage().props; // assuming `cliente` is passed via props

    const { data, setData, put, errors } = useForm({
        nome: cliente.nome || '',
        email: cliente.email || '',
        telefone: cliente.telefone || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('clientes.update', cliente.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Cliente" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                    <Link
                        href={route('Clientes.Index')}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Voltar atrás
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input
                            id="nome"
                            className="mt-1 block w-full"
                            value={data.nome}
                            onChange={(e) => setData('nome', e.target.value)}
                            autoComplete="nome"
                            placeholder="Nome"
                        />
                        <InputError className="mt-2" message={errors.nome} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            id="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoComplete="email"
                            placeholder="E-mail"
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                            id="telefone"
                            className="mt-1 block w-full"
                            value={data.telefone}
                            onChange={(e) => setData('telefone', e.target.value)}
                            autoComplete="telefone"
                            placeholder="Telefone"
                        />
                        <InputError className="mt-2" message={errors.telefone} />
                    </div>

                    <div>
                        <Button>Guardar</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
