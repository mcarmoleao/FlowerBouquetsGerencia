<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FlorController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', 'role:admin,funcionario'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
Route::resource('reclamacoes', App\Http\Controllers\ReclamacaoController::class);
});
Route::resource('clientes', App\Http\Controllers\ClienteController::class)->middleware(['auth']);
Route::get('/Clientes', [App\Http\Controllers\ClienteController::class, 'Index'])->name('Clientes.Index');
Route::get('/clientes/{id}/edit', [App\Http\Controllers\ClienteController::class, 'edit'])->name('Clientes.Edit');

Route::resource('flores', FlorController::class);
Route::get('/Flores', [App\Http\Controllers\FlorController::class, 'Index'])->name('Flores.Index');
Route::get('/flores/{id}/edit', [App\Http\Controllers\FlorController::class, 'edit'])->name('Flores.Edit');
Route::put('/flores/{flor}', [FlorController::class, 'update'])->name('flores.update');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
