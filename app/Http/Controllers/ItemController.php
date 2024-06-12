<?php

namespace App\Http\Controllers;

use App\Models\item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = item::all();
        return response()->json(['Items' => $items], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Placeholder content
        return response()->json(['message' => 'Show item creation form'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        item::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'Store new item'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $items = item::find($id);
        return response()->json(['Items' => $items], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Placeholder content
        return response()->json(['message' => 'Show item edit form for ID: ' . $id], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $item = item::find($id);
        $item->name = $request->name;
        $item->description = $request->description;
        $item->save();

        return response()->json(['message' => 'Item updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(item $item)
    {
        $item->delete();

        return response()->json(['message' => 'College deleted successfully']);
    }
}
