<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Reclamacao;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReclamacaoController extends Controller
{
    public function index()
    {
        $reclamacoes = Reclamacao::with('cliente')->latest()->get()->map(function ($reclamacao) {
            return [
                'id' => $reclamacao->id,
                'titulo' => $reclamacao->titulo,
                'descricao' => $reclamacao->descricao,
                'cliente' => [
                    'id' => $reclamacao->cliente->id,
                    'nome' => $reclamacao->cliente->nome,
                ],
                'created_at' => $reclamacao->created_at,
            ];
        });

        return Inertia::render('Reclamacoes/Index', [
            'reclamacoes' => $reclamacoes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Reclamacoes/Create', [
            'clientes' => Cliente::all(),
        ]);

    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'cliente_id' => 'required|integer|exists:clientes,id',
        ]);

        Reclamacao::create([
            'titulo' => $request->titulo,
            'descricao' => $request->descricao,
            'cliente_id' => $request->cliente_id,
        ]);

        return redirect()->route('reclamacoes.index');
    }

    public function edit(string $id)
    {
        $reclamacao = Reclamacao::find($id);
        return Inertia::render('Reclamacoes/Edit', [
            "reclamacao" => $reclamacao
        ]);
    }

    public function destroy(string $id)
    {
        Reclamacao::destroy($id);
        return redirect()->route('reclamacoes.index')->with('success', 'Reclamação removida com sucesso!');
    }
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'descricao' => 'required|string|max:500',
        ]);

        $reclamacao = Reclamacao::find($id);
        $reclamacao-> titulo = $request->titulo;
        $reclamacao-> descricao = $request->descricao;
        $reclamacao->save();

        return redirect()->route('reclamacoes.index');
    }
}