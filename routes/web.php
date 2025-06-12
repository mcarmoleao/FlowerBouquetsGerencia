<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FlorController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Dashboard e reclamações para admin e funcionario
Route::middleware(['auth', 'verified', 'role:admin,funcionario'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('reclamacoes', App\Http\Controllers\ReclamacaoController::class);
});

// Ambos (admin e funcionario) podem ver o index das flores
Route::middleware(['auth', 'verified', 'role:admin,funcionario'])->group(function () {
    Route::get('flores', [FlorController::class, 'index'])->name('flores.index');
});

// Só admin pode CRUD funcionários e ver flores (apenas show)
Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('funcionarios', [App\Http\Controllers\UserController::class, 'index'])->name('funcionarios.index');
    Route::put('funcionarios/{id}', [App\Http\Controllers\UserController::class, 'update'])->name('funcionarios.update');
    Route::delete('funcionarios/{id}', [App\Http\Controllers\UserController::class, 'destroy'])->name('funcionarios.destroy');
    // Só pode ver flores (show)
    Route::get('flores/{flor}', [FlorController::class, 'show'])->name('flores.show');
});

// Só funcionario pode CRUD flores (exceto index)
Route::middleware(['auth', 'verified', 'role:funcionario'])->group(function () {
    Route::get('flores/create', [FlorController::class, 'create'])->name('flores.create');
    Route::post('flores', [FlorController::class, 'store'])->name('flores.store');
    Route::get('flores/{flor}/edit', [FlorController::class, 'edit'])->name('flores.edit');
    Route::put('flores/{flor}', [FlorController::class, 'update'])->name('flores.update');
    Route::delete('flores/{flor}', [FlorController::class, 'destroy'])->name('flores.destroy');
});

// Ambos podem ver clientes, mas só funcionario pode criar, editar e remover
Route::middleware(['auth', 'verified', 'role:admin,funcionario'])->group(function () {
    Route::get('clientes', [App\Http\Controllers\ClienteController::class, 'index'])->name('clientes.index');
    Route::get('clientes/{id}', [App\Http\Controllers\ClienteController::class, 'show'])->name('clientes.show');
});
Route::middleware(['auth', 'verified', 'role:funcionario'])->group(function () {
    Route::get('clientes/create', [App\Http\Controllers\ClienteController::class, 'create'])->name('clientes.create');
    Route::post('clientes', [App\Http\Controllers\ClienteController::class, 'store'])->name('clientes.store');
    Route::get('clientes/{id}/edit', [App\Http\Controllers\ClienteController::class, 'edit'])->name('clientes.edit');
    Route::put('clientes/{id}', [App\Http\Controllers\ClienteController::class, 'update'])->name('clientes.update');
    Route::delete('clientes/{id}', [App\Http\Controllers\ClienteController::class, 'destroy'])->name('clientes.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
