<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('project.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   

        // dd($request);
        $data = request()->validate([
            'name' => 'required|max:255',
            'details' => 'required|max:4000',
            'skills' => 'required|max:5',
            'minBudget' => 'required',
            'maxBudget' => 'required',
            'currencyType' => 'required',
            'projectType' => 'required'
        ]);

        $project = Project::create([
            'name' => $data['name'],
            'details' => $data['details'],
            'currency_type' => $data['currencyType'],
            'min_budget' => $data['minBudget'],
            'max_budget' => $data['maxBudget'],
            'project_type' => $data['projectType'],
            'user_id' => auth()->user()->id,
        ]);

        $project->skills()->attach($request->get('skills'));

        return redirect()->route('home');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        //
    }
}
