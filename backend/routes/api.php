<?php
use App\Http\Controllers\BudgetAllocationController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PetitionController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UpdateController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoteController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InstituteController;

// Public routes
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', function () {
    return User::all();
});

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/institutes/projects', [InstituteController::class, 'getInstituteProjects']);

// Public GET routes for API Resources
Route::get('/institutes', [InstituteController::class, 'index']);
Route::get('/institutes/{institute}', [InstituteController::class, 'show']);

Route::get('/petitions', [PetitionController::class, 'index']);
Route::get('/petitions/{petition}', [PetitionController::class, 'show']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);

// Protect routes requiring authentication
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/getUserPetitions', [PetitionController::class, 'getUserPetitions']);

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/upvote', [VoteController::class, 'upvote']);
    Route::post('/downvote', [VoteController::class, 'downvote']);
    Route::post('/comment', [CommentController::class, 'comment']);
    Route::post('/updateProfile', [UserController::class, 'updateProfile']);
    Route::post('/updateInstitute', [InstituteController::class, 'updateInstitute']);
    
    // Remaining protected API resource routes
    Route::apiResource('institutes', InstituteController::class)->except(['index', 'show']);
    Route::apiResource('petitions', PetitionController::class)->except(['index', 'show']);
    Route::apiResource('projects', ProjectController::class)->except(['index', 'show']);
    Route::apiResource('votes', VoteController::class);
    Route::apiResource('updates', UpdateController::class);
    Route::apiResource('comments', CommentController::class);
    Route::apiResource('budget-allocations', BudgetAllocationController::class);
});
