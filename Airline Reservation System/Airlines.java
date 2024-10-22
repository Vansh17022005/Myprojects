import java.util.*;
class Airlines
{
	public static void main(String[]args)
	{
			Gourney g=new Gourney();
			g.info();
			g.set();
			g.selectPrice();
			g.class1();
			g.seat();
			g.display();
	}
}
class Book
{
    static  final int NUM_SEATS = 90;
    static final String EMPTY_SEAT = "*";
    static final String TAKEN_SEAT = "X";
    static String[] seats = new String[NUM_SEATS];
	Scanner sc=new Scanner(System.in);
	int seatn,c1=0,c2=0,totalTicket=0;
	String name,mobno,address,ys,ts,flightType;
	String [] city ={"New Delhi","Bangalore","Chennai","Hyderabad","Goa","Ahmedabad","Jaipur","Lucknow","Chandigarh","Mumbai"};
	String [] interCity ={"New York","London","Dubai","Paris","Moscow","Mexico","Shanghai","Tokyo","Rome","lahore"};
	void info()
	{
		System.out.println("Enter Your Name : ");
		name=sc.nextLine();
		System.out.println("Enter Your Address : ");
		address=sc.nextLine();
		boolean valid=false;
		while(!valid){
		System.out.println("Enter Your Mobile no :");
		mobno=sc.nextLine();
		if(mobno.length()==10)
		{
			if(mobno.charAt(0)=='9' || mobno.charAt(0)=='8' || mobno.charAt(0)=='7')
			{
				for(int i=0;i<mobno.length();i++){
					if(mobno.charAt(i)>47&&mobno.charAt(i)<58){
						valid=true;
						}
					else{
						valid=false;
					}
				}				
			}
			if(valid){
				System.out.println("Your Mobile Number is valid");
			}
			else
			{
				System.out.println("Your Mobile Number is not valid");
				
			}
		}
		else
		{
			System.out.println("Mobile Number Must be 10 Number");
		}
		}
	}
	void set(){
	boolean b1=true;
	String a,b;
	while(b1){
		System.out.print("Enter your station : ");
		a=sc.nextLine();
		for(int i=0;i<city.length;i++){
			if(city[i].equalsIgnoreCase(a)){
				ys=city[i];
				b1=false;
				c1=1;
			}
		}
		for(int i=0;i<interCity.length;i++){
			if(interCity[i].equalsIgnoreCase(a)){
				ys=interCity[i];
				b1=false;
				c1=2;
			}
		}
		if(b1){System.out.println("Enter valid Airport");}
	}
		for(int j=0;j<interCity.length;j++){
				if(interCity[j].equalsIgnoreCase(ys)){
					continue;
				}
				else{
					System.out.print((j+1)+"- "+interCity[j]+"  ");
				}
				if(j%2==0){System.out.println();}
				
			}
			for(int j=0;j<city.length;j++){
				if(city[j].equalsIgnoreCase(ys)){
					continue;
				}
				else{
					System.out.print((j+1)+"- "+city[j]+"  ");
				}
				if(j%2==0){System.out.println();}
				}
		while(!b1){
		System.out.print("Enter transport station : ");
		b=sc.nextLine();
		for(int i=0;i<city.length;i++){
			if(city[i].equalsIgnoreCase(b)){
				ts=city[i];
				b1=true;
				c2=1;
			}
		}
		for(int i=0;i<interCity.length;i++){
			if(interCity[i].equalsIgnoreCase(b)){
				ts=interCity[i];
				b1=true;
				c2=2;
			}
		}
		if(!b1){System.out.println("Enter Valid Airport");}
	}
		if(c1==1&&c2==1){
		flightType="National";
		}
		else{
		flightType="International";
		}
	}
	void seat(){
	 for (int i = 0; i < NUM_SEATS; i++) {
            seats[i] = EMPTY_SEAT;
        }
		boolean b2=true;
        while (b2) {
            displaySeats();
            System.out.println("Please select an option:");
            System.out.println("1. Reserve a seat");
            System.out.println("2. Cancel a reservation");
            System.out.println("3. Exit");
            int option = sc.nextInt();
			if(option==1){
				reserveSeat();
            }
			else if(option==2){ 
				cancelReservation();
			}
			else if(option==3){
				b2=false;
				return;
			}
			else{
				System.out.println("Invalid option!");
			}
        }
    }	
    void displaySeats() {
        System.out.println("Seats:");
        for (int i = 1; i <= NUM_SEATS; i++) {
			if(i%1==0||i%2==0||i%4==0||i%5==0||i%7==0||i%8==0){
            System.out.print(seats[i-1] + " ");
			}
            if (i%3==0||i%6==0) {
                System.out.print("   ");
            }
            if (i%9==0) {
                System.out.println();
            }
        }
        System.out.println();
    }
    void reserveSeat() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Please enter the seat number (1-" + NUM_SEATS + "):");
        int seatNumber = scanner.nextInt();
        if (seatNumber < 1 || seatNumber > NUM_SEATS) {
            System.out.println("Invalid seat number. Please try again.");
            return;
        }
        if (seats[seatNumber - 1].equals(TAKEN_SEAT)) {
            System.out.println("Seat is already taken. Please choose another seat.");
            return;
        }
        seats[seatNumber - 1] = TAKEN_SEAT;
		totalTicket++;
        System.out.println("Seat reserved successfully.");
		seatn=seatNumber;
    }

    void cancelReservation() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Please enter the seat number (1-" + NUM_SEATS + ") to cancel:");
        int seatNumber = scanner.nextInt();

        if (seatNumber < 1 || seatNumber > NUM_SEATS) {
            System.out.println("Invalid seat number. Please try again.");
            return;
        }

        if (seats[seatNumber - 1].equals(EMPTY_SEAT)) {
            System.out.println("Seat is already empty. No need to cancel.");
            return;
        }

        seats[seatNumber - 1] = EMPTY_SEAT;
		totalTicket--;
        System.out.println("Reservation cancelled successfully.");
    }
}
class Gourney extends Book{
	double price;
	String sa,so;
	void selectPrice(){
		String temp;
	if(flightType.equalsIgnoreCase("International")){
		if(c1==1){
			temp=ts;
			ts=ys;
			ys=temp;
		}
		if(ys.equalsIgnoreCase("New york")){newYork();}
		if(ys.equalsIgnoreCase("London")){london();}		
		if(ys.equalsIgnoreCase("Dubai")){dubai();}		
		if(ys.equalsIgnoreCase("Paris")){paris();}		
		if(ys.equalsIgnoreCase("Moscow")){moscow();}		
		if(ys.equalsIgnoreCase("Mexico")){mexico();}		
		if(ys.equalsIgnoreCase("bangkok")){bangkok();}		
		if(ys.equalsIgnoreCase("Tokyo")){tokyo();}		
		if(ys.equalsIgnoreCase("Rome")){rome();}	
		if(ys.equalsIgnoreCase("Lahore")){lahore();}
	}
	else{
		if(ys.equalsIgnoreCase("New Delhi")){newDelhi();}
		if(ys.equalsIgnoreCase("Bangalore")){bangalore();}		
		if(ys.equalsIgnoreCase("Chennai")){chennai();}		
		if(ys.equalsIgnoreCase("Hyderabad")){hyderabad();}		
		if(ys.equalsIgnoreCase("Goa")){goa();}		
		if(ys.equalsIgnoreCase("Ahmedabad")){ahmedabad();}		
		if(ys.equalsIgnoreCase("Jaipur")){jaipur();}		
		if(ys.equalsIgnoreCase("Lucknow")){lucknow();}		
		if(ys.equalsIgnoreCase("Chandigarh")){chandigarh();}		
		if(ys.equalsIgnoreCase("Mumbai")){mumbai();}
	}
	if(c1==1){
			temp=ts;
			ts=ys;
			ys=temp;
		}
	}
	void newYork(){
		double arr[]={0,20000,30000,18000,35000,25000,50000,22000,23000,40000};
		
		//{"New York","London","Dubai","Paris","Moscow","Mexico city","bangkok","Tokyo","Rome",""}
		for(int i=0;i<interCity.length;i++){
			if(ts.equalsIgnoreCase(interCity[i])){
				price=arr[i];
			}
		}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[9];
			}
		}
	}
	void london(){
		double arr[]={20000,0,15000,4000,22000,10000,36000,55000,7000,21000};
		//{"New York","London","Dubai","Paris","Moscow","Mexico city","bangkok","Tokyo","Rome",""}
		for(int i=0;i<interCity.length;i++){
			if(ts.equalsIgnoreCase(interCity[i])){
				price=arr[i];
			}
		}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[9];
			}
		}
	}
	void dubai(){
		double arr[]={36000,15000,0,20000,14000,90000,22000,40000,10000,10000};
		//{"New York","London","Dubai","Paris","Moscow","Mexico city","bangkok","Tokyo","Rome",""}
		for(int i=0;i<interCity.length;i++){
			if(ts.equalsIgnoreCase(interCity[i])){
				price=arr[i];
			}
		}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[9];
			}
		}	
	}
	void paris(){
		double arr[]={18000,4000,20000,0,20000,370000,36000,72000,5000,22000};
		//{"New York","London","Dubai","Paris","Moscow","Mexico city","bangkok","Tokyo","Rome",""}
		for(int i=0;i<interCity.length;i++){
			if(ts.equalsIgnoreCase(interCity[i])){
				price=arr[i];
			}
		}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[9];
			}
		}  
	}
	void moscow(){
		double arr[]={80000,40000,60000,36000,0,45000,180000,100000,32000,80000};
		//{"New York","London","Dubai","Paris","Moscow","Mexico city","bangkok","Tokyo","Rome",""}
		for(int i=0;i<interCity.length;i++){
			if(ts.equalsIgnoreCase(interCity[i])){
				price=arr[i];
			}
		}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[9];
			}
		}
	}
	void mexico(){ 
		double arr[]={45000,40000,60000,36000,80000,0,180000,100000,32000,80000};
		//{"New York","London","Dubai","Paris","Moscow","Mexico city","bangkok","Tokyo","Rome","lahore"}
		for(int i=0;i<interCity.length;i++){
			if(ts.equalsIgnoreCase(interCity[i])){
				price=arr[i];
			}
		}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[9];
			}
		}
		
	}
	void bangkok(){
		double arr[]={180000,40000,60000,36000,80000,45000,0,100000,32000,80000};
		//{"New York","London","Dubai","Paris","Moscow","Mexico city","bangkok","Tokyo","Rome","lahore"}
		for(int i=0;i<interCity.length;i++){
			if(ts.equalsIgnoreCase(interCity[i])){
				price=arr[i];
			}
		}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[9];
			}
		}
	}
	void tokyo(){
		double arr[]={10000,40000,60000,36000,80000,45000,18000,0,32000,80000};
		//{"New York","London","Dubai","Paris","Moscow","Mexico city","bangkok","Tokyo","Rome","lahore"}
		for(int i=0;i<interCity.length;i++){
			if(ts.equalsIgnoreCase(interCity[i])){
				price=arr[i];
			}
		}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[9];
			}
		}
	}
	void rome(){
		double arr[]={32000,40000,60000,36000,80000,45000,18000,10000,0,80000};
		//{"New York","London","Dubai","Paris","Moscow","Mexico city","bangkok","Tokyo","Rome","lahore"}
		for(int i=0;i<interCity.length;i++){
			if(ts.equalsIgnoreCase(interCity[i])){
				price=arr[i];
			}
		}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[9];
			}
		}
	}
	void lahore(){
		double arr[]={80000,40000,60000,36000,80000,45000,80000,10000,32000,0};
		//{"New York","London","Dubai","Paris","Moscow","Mexico city","bangkok","Tokyo","Rome","lahore"}
		for(int i=0;i<interCity.length;i++){
			if(ts.equalsIgnoreCase(interCity[i])){
				price=arr[i];
			}
		}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=5000;
			}
		}
	}
	void newDelhi(){
		double arr[]={0,2000,3000,3500,4100,2200,2300,25000,4000,2600};
	//{"New Delhi","Bangalore","Chennai","Hyderabad","Goa","Ahmedabad","Jaipur","Lucknow","Chandigarh","internationalnational"}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[i];
			}
		}
	}
	void bangalore(){
		double arr[]={2100,0,2300,3500,4000,3200,3100,2500,2200,2600};
	//{"New Delhi","Bangalore","Chennai","Hyderabad","Goa","Ahmedabad","Jaipur","Lucknow","Chandigarh","Mumbai"}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[i];
			}
		}
	}
	void chennai(){
		double arr[]={2600,2300,0,3100,3000,2800,2400,2800,2500,3200};
	//{"New Delhi","Bangalore","Chennai","Hyderabad","Goa","Ahmedabad","Jaipur","Lucknow","Chandigarh","Mumbai"}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[i];
			}
		}
	}
	void hyderabad(){
		double arr[]={2500,3300,3200,0,2100,2500,2400,2000,3500,4000};
	//{"New Delhi","Bangalore","Chennai","Hyderabad","Goa","Ahmedabad","Jaipur","Lucknow","Chandigarh","Mumbai"}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[i];
			}
		}
	}
	void goa(){
		double arr[]={3100,2100,3200,2500,0,2400,4000,3000,2800,3200};
	//{"New Delhi","Bangalore","Chennai","Hyderabad","Goa","Ahmedabad","Jaipur","Lucknow","Chandigarh","Mumbai"}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[i];
			}
		}
	}
	void ahmedabad(){
		double arr[]={2500,4000,3100,2500,2100,0,3500,21000,2200,3600};
	//{"New Delhi","Bangalore","Chennai","Hyderabad","Goa","Ahmedabad","Jaipur","Lucknow","Chandigarh","Mumbai"}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[i];
			}
		}
	}
	void jaipur(){
		double arr[]={3100,2100,2200,3500,2500,2400,0,3000,2800,2500};
	//{"New Delhi","Bangalore","Chennai","Hyderabad","Goa","Ahmedabad","Jaipur","Lucknow","Chandigarh","Mumbai"}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[i];
			}
		}
	}
	void lucknow(){
		double arr[]={4000,2200,2500,2600,3500,3100,2400,0,3500,4000};
	//{"New Delhi","Bangalore","Chennai","Hyderabad","Goa","Ahmedabad","Jaipur","Lucknow","Chandigarh","Mumbai"}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[i];
			}
		}
	}
	void chandigarh(){
		double arr[]={3100,2100,3200,2500,2800,2400,4000,3000,0,3200};
	//{"New Delhi","Bangalore","Chennai","Hyderabad","Goa","Ahmedabad","Jaipur","Lucknow","Chandigarh","Mumbai"}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[i];
			}
		}
	}
	void mumbai(){
		double arr[]={2800,2500,2400,3500,3000,3200,3100,4000,2500,0};
	//{"New Delhi","Bangalore","Chennai","Hyderabad","Goa","Ahmedabad","Jaipur","Lucknow","Chandigarh","Mumbai"}
		for(int i=0;i<city.length;i++){
			if(ts.equalsIgnoreCase(city[i])){
				price=arr[i];
			}
		}
	}
	void class1(){
		System.out.print("You want to One Way/Round Trip : ");
		sa=sc.nextLine();
		if(sa.equalsIgnoreCase("One way")){
			price=price;
		}
		else if(sa.equalsIgnoreCase("Round Trip")){
			price=price*2;
		}
		else{
			System.out.println("Please select from above");
			class1();
		}
		double ecoprice=price;
		double busiprice=price*3.5;
		double firprice=price*2.5;
		System.out.println("Chosse class : \nEconomy Class : "+ecoprice+"\nBusiness Class : "+busiprice+"\nFirst Class : "+firprice);
		so=sc.nextLine();
		if(so.equalsIgnoreCase("Economy Class")){
			price=ecoprice;
		}
		else if(so.equalsIgnoreCase("Buisness Class")){
			price=busiprice;
		}
		else if(so.equalsIgnoreCase("First Class")){
			price=firprice;
		}
		else{
			System.out.println("Enter from above class");
			class1();
		}
	}
	void display(){
		price*=totalTicket;
		System.out.println("Name : "+name);
		System.out.println("Address : "+address);
		System.out.println("Mobile Number : "+mobno);
		System.out.println("\nGourney : "+ys+" To "+ts);
		System.out.println("Type : "+flightType+" Flight");
		System.out.println("Class : "+so);
		System.out.println(sa.toUpperCase());
		System.out.println("Ticket Price : "+price);
		System.out.println("\nEnjoy Your Journey");
	}
}