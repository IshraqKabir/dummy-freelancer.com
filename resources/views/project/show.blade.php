
@extends ('main')

@section ('content')
    <div class="project_header">
        <div class="flex-item one">
            {{ $project->name }}
        </div>    
        <div class="flex-item two">
            BUDGET {{ $project->min_budget}} - {{ $project->max_budget}} {{ $project->currency_type}}
            @if ($project->project_type === 'hourly')
                / hour
            @endif
        </div>
    </div>

    <div class="project">
        <div class="project_info box-shadow">
            <div class="container">
                <div class="details">
                    {{ $project->details}}
                </div>
                <div class="skills">
                    <span class="bold">Skills:</span>
                    @foreach ($project->skills as $skill)
                        <a href="#">{{ $skill['name'] }}</a>
                    @endforeach
                </div>
            </div>
        </div>
    </div>

@endsection