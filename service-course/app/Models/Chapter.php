<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
   protected $table = 'chapters'; // nama tabel tetap plural

   protected $fillable = [
       'name',
       'course_id',
   ];

   protected $cast = [
    'created_at' => 'datetime:Y-m-d H:m:s',
    'updated_at' => 'datetime:Y-m-d H:m:s',
];

   public function lessons()
   {
       return $this->hasMany('App\Models\Lesson')->orderBy('id', 'ASC'); // pastikan Lesson juga singular
   }
}
