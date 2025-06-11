<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reclamacao extends Model
{
    protected $table = 'reclamacoes';

    protected $fillable = ['titulo', 'descricao', 'cliente_id'];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }
}
