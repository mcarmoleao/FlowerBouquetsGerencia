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
}

