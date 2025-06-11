import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';

type Props = {
    clientes: { id: number, nome: string }[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Criar Reclamação',
        href: '/reclamacoes',
    },
];

export default function ReclamacaoCreate({ clientes }: Props) {
    const { data, setData, post, errors } = useForm({
        id: '',
        titulo: '',
        descricao: '',
        cliente_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('reclamacoes.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Criar Reclamação" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                    <Link
                        href={route('reclamacoes.index')}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Voltar atrás
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="titulo">Título</Label>
                        <Input
                            id="titulo"
                            className="mt-1 block w-full"
                            value={data.titulo}
                            onChange={(e) => setData('titulo', e.target.value)}
                            autoComplete="titulo"
                            placeholder="Título"
                        />
                        <InputError className="mt-2" message={errors.titulo} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="descricao">Descrição</Label>
                        <Input
                            id="descricao"
                            className="mt-1 block w-full"
                            value={data.descricao}
                            onChange={(e) => setData('descricao', e.target.value)}
                            autoComplete="descricao"
                            placeholder="Descrição"
                        />
                        <InputError className="mt-2" message={errors.descricao} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="cliente">Cliente</Label>
                        <select
                            id="cliente"
                            value={data.cliente_id}
                            onChange={(e) => setData('cliente_id', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Seleciona um cliente</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nome}
                                </option>
                            ))}
                        </select>
                        <InputError className="mt-2" message={errors.cliente_id} />
                    </div>

                    <div>
                        <Button>Guardar</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
