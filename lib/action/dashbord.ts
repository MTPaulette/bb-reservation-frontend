import { headerOptions } from "../utils";

const api_url = process.env.API_URL;

export async function getStatistics() {
  const response = await fetch(`${api_url}/dashboard`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;//.json();
}

/*
$response = [
  'revenu_of_current_week' => $revenu_of_current_week,
  'sale_of_current_week' => $sale_of_current_week,
  'year' => $year,
  'month' => $month,
  'bestMonth' => $bestMonth,
  'ressource_with_reservations' => $ressource_with_reservations,
  'agency_with_payments_per_month' => $agency_with_payments_per_month,
  'totalClients' => $totalClients,
  'totalReservations' => $totalReservations,
  'totalCancelledReservations' => $totalCancelledReservations,
  'totalRessources' => $totalRessources,
  'totalStaff' => $totalStaff,
  'totalPayments' => $totalPayments,
  'totalRevenue' => $totalRevenue,
  'totalDue' => $totalDue,
  'totalCurrentReservations' => $totalCurrentReservations,
  'currentReservations' => $currentReservations,
  'topClients' => $topClients,
  'agencyWithMostRessources' => $agencyWithMostRessources,
  'bestAgency' => $bestAgency,
]; */