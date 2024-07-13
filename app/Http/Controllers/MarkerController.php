<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MarkerController extends Controller
{
    public function create(Request $request)
    {
        $time = now();
        DB::table('markers')->insert([
            'operator_name' => $request->operatorName,
            'menu' => $request->menu,
            'schedule' => $request->schedule,
            'lat' => $request->lat,
            'lng' => $request->lng,
            'created_at' => $time,
            'updated_at' => $time,
        ]);

        return redirect(route('marker.index'));
    }

    public function index()
    {
        $markers = DB::table('markers')->select('id', 'operator_name', 'menu', 'schedule')->get(); // Adjust query as needed

        return Inertia::render('Marker/Marker', [
            'markers' => $markers,
            'status' => session('status'),
        ]);
    }

    public function edit($id)
    {
        $marker = DB::table('markers')->where('id', $id)->get();

        //dd($marker);

        return Inertia::render('Marker/MarkerEdit', [
            'marker' => $marker,
            'status' => session('status'),
        ]);
    }

    public function update(Request $request, $id)
    {
        /*dd($request->operatorName,
                $request->menu,
                $request->schedule,
                $request->lat,
                $request->lng,
        );*/


        $time = now();
        $affected = DB::table('markers')
            ->where('id', $id)
            ->update([
                'operator_name' => $request->operatorName,
                'menu' => $request->menu,
                'schedule' => $request->schedule,
                'lat' => $request->lat,
                'lng' => $request->lng,
                'updated_at' => $time,
            ]);

        return redirect(route('marker.index'));
    }

    public function destroy($id)
    {
        //dd("delete");

        //$deleteMarker =
        //$menus = Re

        //dd($restaurant);

        //$restaurant = Restaurant::find($id);

        //$restaurant->delete();

        DB::table('markers')->where('id', $id)->delete();

    }

}
