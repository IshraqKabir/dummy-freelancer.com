<?php

use Illuminate\Support\Facades\Route;
use App\Http\Resources\Skill as SkillResource;
use App\Skill;

Route::get('/', function () {
    return view('welcome');
})->name('home');

Auth::routes();

Route::get('/post-project', 'ProjectController@create')->name('create-project');
Route::post('/post-project', 'ProjectController@store')->name('store-project')->middleware('auth');

Route::get('/skills', 'SkillController@index')->name('skill-index-api');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
