import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PayrollView() {
  const salaryData = {
    month: "January 2025",
    employee: "John Doe",
    id: "EMP001",
    earnings: {
      basic: 80000,
      hra: 15000,
      allowance: 5000,
    },
    deductions: {
      tax: 12000,
      pf: 8000,
    },
  }

  const totalEarnings = salaryData.earnings.basic + salaryData.earnings.hra + salaryData.earnings.allowance
  const totalDeductions = salaryData.deductions.tax + salaryData.deductions.pf
  const netPay = totalEarnings - totalDeductions

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200">
        <CardHeader className="border-b bg-blue-50">
          <div className="text-center">
            <CardTitle className="text-3xl text-blue-900">SALARY SLIP</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">{salaryData.month}</p>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="space-y-6">
            {/* Employee Info */}
            <div className="border-b pb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Employee Name</p>
                  <p className="font-semibold text-lg">{salaryData.employee}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Employee ID</p>
                  <p className="font-semibold text-lg">{salaryData.id}</p>
                </div>
              </div>
            </div>

            {/* Earnings */}
            <div className="border-b pb-6">
              <h3 className="font-bold text-lg mb-3 text-blue-900">EARNINGS</h3>
              <div className="space-y-2">
                {Object.entries(salaryData.earnings).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key}</span>
                    <span>₹{value.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                  <span>Total Earnings</span>
                  <span className="text-green-600">₹{totalEarnings.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="border-b pb-6">
              <h3 className="font-bold text-lg mb-3 text-blue-900">DEDUCTIONS</h3>
              <div className="space-y-2">
                {Object.entries(salaryData.deductions).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key}</span>
                    <span>₹{value.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                  <span>Total Deductions</span>
                  <span className="text-red-600">₹{totalDeductions.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Net Pay */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-900">NET PAY</span>
                <span className="text-3xl font-bold text-blue-600">₹{netPay.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
