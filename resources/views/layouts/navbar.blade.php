<ul class="navbar">
    <div class="first_section">
        <li>
        <img src="{{ asset('images/freelancer-logo.png') }}" class="logo" />
        </li>
        <!-- <div class="link-set-1">
            <li class="one">
                <a href="#">How it works</a>
            </li>
            <li class="two">
                <a href="#">Browse Jobs</a>
            </li>
        </div> -->
    </div>
    <div class="second_section">
        <div class="link-set-2">
            @guest
                <li class="three">
                    <a href="/login">Login</a>
                </li>
                <li class="four">
                    <a href="/register">Sign Up</a>
                </li>
            @endguest
            <li class="button">
                <a href="/post-project">Post a Project</a>
            </li>
        </div>
    </div>
</ul>