<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    // List all funcionarios (users with @funcionario.pt email)
    public function index()
    {
        $funcionarios = User::where('email', 'like', '%@funcionario.pt')->get();
        return Inertia::render('Funcionarios', [
            'funcionarios' => $funcionarios,
        ]);
    }

    // Update funcionario
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|ends_with:@funcionario.pt',
        ]);
        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();
        return back();
    }

    // Remove funcionario
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return back();
    }
}
