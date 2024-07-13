<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MarkerController;
use App\Http\Controllers\MobileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/marker/create', [MarkerController::class, 'create'])->name('marker.create')->middleware(['auth', 'verified']);
Route::get('/marker', [MarkerController::class, 'index'])->name('marker.index');
Route::get('/marker/edit/{id}', [MarkerController::class, 'edit'])->name('marker.edit');
Route::delete('/marker/{id}/delete', [MarkerController::class, 'destroy'])->name('marker.destroy');
Route::get('/marker/edit/{id}', [MarkerController::class, 'edit'])->name('marker.edit');
Route::post('/marker/edit/{id}', [MarkerController::class, 'update'])->name('marker.update');

Route::get('/api/markers', [MobileController::class, 'markers'])->name('mobile.markers');

require __DIR__.'/auth.php';
