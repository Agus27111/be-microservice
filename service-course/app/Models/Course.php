<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $table = 'courses';

    protected $fillable = [
        'name',
        'certificate',
        'thubnail',
        'type',
        'level',
        'description',
        'price',
        'image',
        'status',
        'mentor_id',
    ];

    protected $cast = [
        'created_at' => 'datetime:Y-m-d H:m:s',
        'updated_at' => 'datetime:Y-m-d H:m:s',
    ];

    public function mentor()
    {
        return $this->belongsTo('App\Models\Mentor', 'mentor_id', 'id');
    }

    public function chapters()
    {
        return $this->hasMany('App\Models\chapter')->orderBy('id', 'ASC');
    }

    public function images()
    {
        return $this->hasMany('App\Models\imageCourse')->orderBy('id', 'DESC');
    }
}
