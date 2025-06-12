<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flor extends Model
{
    protected $table = 'flores';
    protected $fillable = ['nome', 'preco', 'stock'];

}
