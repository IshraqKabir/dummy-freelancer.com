<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('home');

// Auth::routes();

Route::get('/post-project', 'ProjectController@create')->name('create-project');
Route::post('/post-project', 'ProjectController@store')->name('store-project');


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
