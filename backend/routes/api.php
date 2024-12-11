<?php

use App\Http\Controllers\BudgetAllocationController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PetitionController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UpdateController;
use App\Http\Controllers\VoteController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InstituteController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', function () {
    return User::all();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


Route::apiResource('institutes', InstituteController::class);
Route::apiResource('petitions', PetitionController::class);
Route::apiResource('projects', ProjectController::class);
Route::apiResource('votes', VoteController::class);
Route::apiResource('updates', UpdateController::class);
Route::apiResource('comments', CommentController::class);
Route::apiResource('budget-allocations', BudgetAllocationController::class);



