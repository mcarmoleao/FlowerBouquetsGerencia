<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cliente;

class ClienteController extends Controller
{
 
    public function index()
    {
        return Inertia::render('Clientes/Index', [
            'clientes' => Cliente::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Clientes/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'email' => 'required|email|max:100|unique:clientes,email',
            'telefone' => 'nullable|string|max:9',
        ]);

        Cliente::create([
            'nome' => $request->nome,
            'email' => $request->email,
            'telefone' => $request->telefone,
        ]);

        return redirect()->route('clientes.index');


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $cliente = Cliente::find($id);
        return Inertia::render('Clientes/Edit', [
            "cliente" => $cliente
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'telefone' => 'nullable|string|max:9',
        ]);

        $cliente = Cliente::find($id);
        $cliente-> nome = $request->nome;
        $cliente-> email = $request->email;
        $cliente-> telefone = $request->telefone;
        $cliente->save();

        return redirect()->route('clientes.index');
    }

    public function destroy(string $id)
    {
        Cliente::destroy($id);
        return redirect()->route('clientes.index')->with('success', 'Cliente removido com sucesso!');
    }
}
