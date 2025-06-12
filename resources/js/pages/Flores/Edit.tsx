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
        title: 'Flores',
        href: '/flores',
    },
    {
        title: 'Editar Flor',
        href: '#',
    },
];

export default function FlorEdit() {
    const { flor } = usePage().props;

    const { data, setData, put, errors } = useForm({
        nome: flor.nome || '',
        preco: flor.preco || '',
        stock: flor.stock || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('flores.update', { flor: flor.id })); 
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Flor" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                    <Link
                        href={route('flores.index')}
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
                            placeholder="Nome da flor"
                        />
                        <InputError className="mt-2" message={errors.nome} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="preco">Preço (€)</Label>
                        <Input
                            id="preco"
                            type="number"
                            step="0.01"
                            className="mt-1 block w-full"
                            value={data.preco}
                            onChange={(e) => setData('preco', e.target.value)}
                            placeholder="0.00"
                        />
                        <InputError className="mt-2" message={errors.preco} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                            id="stock"
                            type="number"
                            className="mt-1 block w-full"
                            value={data.stock}
                            onChange={(e) => setData('stock', e.target.value)}
                            placeholder="Quantidade em stock"
                        />
                        <InputError className="mt-2" message={errors.stock} />
                    </div>

                    <div>
                        <Button type="submit">Guardar Alterações</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}