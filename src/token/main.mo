import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor token {
    Debug.print(debug_show("hello"));
    var owner : Principal = Principal.fromText("ysvys-6kx4d-sjhw4-iid7y-friwh-44rgs-arjyg-57f7q-n62u4-jo66n-xae");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "DDIAL";

    private var balances = HashMap.HashMap<Principal, Nat> (1, Principal.equal, Principal.hash);

    if(balances.size() < 1 ){
        balances.put(owner, totalSupply);
    };

    private stable var balanceEntries : [(Principal, Nat)] = [];

    public query func balanceOf(who: Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)){
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func getSymbol(): async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text {
        Debug.print(debug_show(msg.caller));
        var user = msg.caller;
        if(balances.get(user) == null){
            let result = await transfer(user, 10000);
            // balances.put(userPrincipal, 1000);
            return result;
        }else {
            return "Already claimed!"
        }
    };

    public shared(msg) func transfer(to : Principal, amount : Nat) : async Text {
        let fromBalance : Nat = await balanceOf(msg.caller);
        if(fromBalance > amount){
            let newFromBalance : Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);  

            let toBalance = await balanceOf(to);
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);
            return "Success";
        }else {
            return "Insufficient funds!";
        }
    };

    system func preupgrade(){
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade(){
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if(balances.size() < 1 ){
            balances.put(owner, totalSupply);
        } 

    }
}