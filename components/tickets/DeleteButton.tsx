"use client";

export function DeleteButton({ ticketId }: { ticketId: string }) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    
    const res = await fetch(`/api/tickets/${ticketId}`, { method: "DELETE" });
    if (res.ok) {
      window.location.href = "/tickets";
    } else {
      alert("Failed to delete ticket");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-sm text-red-600 hover:underline"
    >
      Delete
    </button>
  );
}
