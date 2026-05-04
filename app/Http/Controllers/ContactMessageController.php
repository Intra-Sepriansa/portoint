<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactMessageRequest;
use App\Mail\PortfolioContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class ContactMessageController extends Controller
{
    private const RecipientEmail = 'intrasepriansaa@gmail.com';

    public function __invoke(ContactMessageRequest $request): RedirectResponse
    {
        $messageData = $request->validated();

        Mail::to(self::RecipientEmail)->send(
            new PortfolioContactMessage($messageData),
        );

        return back()->with('contactMessage', [
            'status' => 'sent',
        ]);
    }
}
