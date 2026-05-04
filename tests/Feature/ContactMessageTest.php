<?php

use App\Mail\PortfolioContactMessage;
use Illuminate\Support\Facades\Mail;

test('visitors can send a portfolio contact message', function () {
    Mail::fake();

    $payload = [
        'name' => 'Intra Client',
        'contactEmail' => 'client@example.com',
        'message' => 'I need a production-ready dashboard for my school platform.',
    ];

    $this
        ->from(route('home'))
        ->post(route('contact-messages.store'), $payload)
        ->assertRedirect(route('home'))
        ->assertSessionHas('contactMessage.status', 'sent');

    Mail::assertSent(
        PortfolioContactMessage::class,
        fn (PortfolioContactMessage $mail) => $mail->messageData === $payload,
    );
});

test('portfolio contact messages require valid sender details', function () {
    Mail::fake();

    $this
        ->from(route('home'))
        ->post(route('contact-messages.store'), [
            'name' => '',
            'contactEmail' => 'not-an-email',
            'message' => 'short',
        ])
        ->assertRedirect(route('home'))
        ->assertSessionHasErrors(['name', 'contactEmail', 'message']);

    Mail::assertNothingSent();
});
