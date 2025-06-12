<?php

namespace App\Http\Controllers;

use App\Models\Flor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FlorController extends Controller
{
    public function index()
    {
        return Inertia::render('Flores/Index', [
            'flores' => Flor::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Flores/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string',
            'preco' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        Flor::create($request->all());

        return redirect()->route('flores.index');
    }

    public function edit(Flor $flor)
    {
        return Inertia::render('Flores/Edit', [
            'flor' => $flor,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'preco' => 'required|numeric|max:100',
            'stock' => 'nullable|integer|max:100',
        ]);

        $flor->nome = $request->nome;
        $flor->preco = $request->preco;
        $flor->stock = $request->stock;
        $flor->save();

        return redirect()->route('flores.index');
    }

    public function destroy(string $id){
        Flor::destroy($id);
        return redirect()->route('flores.index')->with('success', 'Flor removida com sucesso!');
    }
}

