<?php

use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/', [PortfolioController::class, 'home'])->name('home');
Route::get('/projects', [PortfolioController::class, 'projects'])->name('projects.index');
Route::get('/projects/{slug}', [PortfolioController::class, 'projectShow'])->name('projects.show');
Route::get('/contact', [PortfolioController::class, 'contact'])->name('contact');

Route::inertia('/welcome', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
