<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MobileController extends Controller
{
    public function markers()
    {
        $markers = DB::table('markers')->get();

        return response()->json([
            'body' => $markers,
        ], 200);
    }
}
