<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PortfolioContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @param  array{name: string, contactEmail: string, message: string}  $messageData
     */
    public function __construct(public array $messageData) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            replyTo: [
                new Address(
                    $this->messageData['contactEmail'],
                    $this->messageData['name'],
                ),
            ],
            subject: "Pesan portofolio dari {$this->messageData['name']}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.portfolio-contact-message',
            with: [
                'messageData' => $this->messageData,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
